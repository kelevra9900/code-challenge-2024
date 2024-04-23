import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';
import { Mock } from 'vitest';

import { User } from '@/api/user/userModel';
import { userRepository } from '@/api/user/userRepository';
import { userService } from '@/api/user/userService';

vi.mock('@/api/user/userRepository');
vi.mock('@/server', () => ({
  ...vi.importActual('@/server'),
  logger: {
    error: vi.fn(),
  },
}));

describe('userService', () => {
  const mockUsers: User[] = [
    {
      _id: '66269e4f919549bc73de2b5e',
      username: 'alice',
      email: 'alice@example.com',
      role: 'admin',
      authentication: {
        password: 'password',
        salt: 'salt',
        sessionToken: 'session',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: '2',
      username: 'bob',
      email: 'bob@example.com',
      role: 'user',
      authentication: {
        password: 'password',
        salt: 'salt',
        sessionToken: 'session',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  describe('findAll', () => {
    it('return all users', async () => {
      // Arrange
      (userRepository.findAllAsync as Mock).mockReturnValue(mockUsers);

      // Act
      const result = await userService.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.success).toBeTruthy();
      expect(result.message).toContain('Users found');
      expect(result.responseObject).toEqual(mockUsers);
    });

    it('returns a not found error for no users found', async () => {
      // Arrange
      (userRepository.findAllAsync as Mock).mockReturnValue(null);

      // Act
      const result = await userService.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(result.success).toBeFalsy();
      expect(result.message).toContain('No Users found');
      expect(result.responseObject).toBeNull();
    });

    it('handles errors for findAllAsync', async () => {
      // Arrange
      (userRepository.findAllAsync as Mock).mockRejectedValue(new Error('Database error'));

      // Act
      const result = await userService.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.success).toBeFalsy();
      expect(result.message).toContain('Error finding all users');
      expect(result.responseObject).toBeNull();
    });
  });

  describe('findById', () => {
    it('returns a user for a valid ID', async () => {
      // Arrange
      const testId = '66269e4f919549bc73de2b5e';
      const mockUser = mockUsers.find((user) => user._id === testId);
      (userRepository.findByIdAsync as Mock).mockReturnValue(mockUser);

      // Act
      const result = await userService.findById(testId.toString());

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.success).toBeTruthy();
      expect(result.message).toContain('User found');
      expect(result.responseObject).toEqual(mockUser);
    });

    it('handles errors for findByIdAsync', async () => {
      // Arrange
      const testId = new ObjectId();
      (userRepository.findByIdAsync as Mock).mockRejectedValue(new Error('Database error'));

      // Act
      const result = await userService.findById(testId.toString());

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.success).toBeFalsy();
      expect(result.message).toContain(`Error finding user with id ${testId}`);
      expect(result.responseObject).toBeNull();
    });

    it('returns a not found error for non-existent ID', async () => {
      // Arrange
      const testId = new ObjectId();
      (userRepository.findByIdAsync as Mock).mockReturnValue(null);

      // Act
      const result = await userService.findById(testId.toString());

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(result.success).toBeFalsy();
      expect(result.message).toContain('User not found');
      expect(result.responseObject).toBeNull();
    });
  });
});
