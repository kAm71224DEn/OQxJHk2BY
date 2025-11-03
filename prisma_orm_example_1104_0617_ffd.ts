// 代码生成时间: 2025-11-04 06:17:05
import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client outside of any function or class so it stays shared across the application.
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn'], // Enable logging for queries and info/warn messages.
});

// Prisma ORM Example Class
class PrismaOrmExample {
  // Function to create a new user
  static async createUser(data: { name: string; email: string }): Promise<void> {
    try {
      await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
        },
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Function to get a user by their email
  static async getUserByEmail(email: string): Promise<{ id: number; name: string; email: string } | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      return user;
    } catch (error) {
      console.error('Error retrieving user:', error);
      throw error;
    }
  }

  // Function to update a user's name
  static async updateUserName(userId: number, newName: string): Promise<void> {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: { name: newName },
      });
    } catch (error) {
      console.error('Error updating user name:', error);
      throw error;
    }
  }

  // Function to delete a user by their ID
  static async deleteUser(userId: number): Promise<void> {
    try {
      await prisma.user.delete({
        where: { id: userId },
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}

// Example usage of the Prisma ORM class
(async () => {
  try {
    // Create a new user
    await PrismaOrmExample.createUser({ name: 'John Doe', email: 'john.doe@example.com' });

    // Get a user by email
    const user = await PrismaOrmExample.getUserByEmail('john.doe@example.com');
    if (user) {
      console.log('User found:', user);
    } else {
      console.log('User not found');
    }

    // Update a user's name
    await PrismaOrmExample.updateUserName(1, 'Jane Doe');

    // Delete a user by ID
    await PrismaOrmExample.deleteUser(1);
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Close the Prisma Client
    await prisma.$disconnect();
  }
})();
