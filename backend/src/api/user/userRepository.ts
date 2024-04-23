// Impement JWT Authentication
import { getAllUsers, getUserByEmail, getUserById, User } from '@/api/user/userModel';

export const mockUsers: User[] = [
  {
    _id: '66269e4f919549bc73de2b5e',
    username: 'noble-six',
    email: 'user@gmail.com',
    authentication: {
      password: 'password',
      salt: 'salt',
      sessionToken: 'sessionToken',
    },
    role: 'reader',
    // set this date 2024-04-22T17:28:47.677Z
    createdAt: new Date('2024-04-22T17:28:47.677Z'),
    updatedAt: new Date('2024-04-22T17:28:47.826Z'),
  },
];

export const userRepository = {
  findAllAsync: async (): Promise<User[]> => {
    return getAllUsers();
  },

  findByIdAsync: async (id: string): Promise<User | null> => {
    return getUserById(id);
  },
  isExistByEmail: async (email: string): Promise<User | null> => {
    return getUserByEmail(email);
  },
};
