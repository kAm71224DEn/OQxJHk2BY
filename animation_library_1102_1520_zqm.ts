// 代码生成时间: 2025-11-02 15:20:16
import { PrismaClient } from '@prisma/client';

// Define the Prisma client
const prisma = new PrismaClient();

// Define the Animation interface
interface Animation {
  id: number;
  name: string;
  duration: number;
  easingFunction: string;
}

class AnimationLibrary {
  private prisma: PrismaClient;

  // Constructor to initialize the Prisma client
  constructor(prismaClient?: PrismaClient) {
    this.prisma = prismaClient ? prismaClient : prisma;
  }

  // Get all animations from the database
  async getAllAnimations(): Promise<Animation[]> {
    try {
      const animations = await this.prisma.animation.findMany();
      return animations;
    } catch (error) {
      console.error('Failed to get all animations:', error);
      throw new Error('Failed to get all animations');
    }
  }

  // Get a specific animation by ID
  async getAnimationById(id: number): Promise<Animation | null> {
    try {
      const animation = await this.prisma.animation.findUnique({
        where: { id },
      });
      return animation;
    } catch (error) {
      console.error('Failed to get animation by ID:', error);
      throw new Error('Failed to get animation by ID');
    }
  }

  // Create a new animation
  async createAnimation(animation: Omit<Animation, 'id'>): Promise<Animation> {
    try {
      const newAnimation = await this.prisma.animation.create({
        data: animation,
      });
      return newAnimation;
    } catch (error) {
      console.error('Failed to create animation:', error);
      throw new Error('Failed to create animation');
    }
  }

  // Update an existing animation
  async updateAnimation(id: number, updates: Partial<Omit<Animation, 'id'>>): Promise<Animation | null> {
    try {
      const updatedAnimation = await this.prisma.animation.update({
        where: { id },
        data: updates,
      });
      return updatedAnimation;
    } catch (error) {
      console.error('Failed to update animation:', error);
      throw new Error('Failed to update animation');
    }
  }

  // Delete an animation by ID
  async deleteAnimation(id: number): Promise<Animation | null> {
    try {
      const deletedAnimation = await this.prisma.animation.delete({
        where: { id },
      });
      return deletedAnimation;
    } catch (error) {
      console.error('Failed to delete animation:', error);
      throw new Error('Failed to delete animation');
    }
  }
}

// Example usage
(async () => {
  const library = new AnimationLibrary();
  try {
    const allAnimations = await library.getAllAnimations();
    console.log('All Animations:', allAnimations);

    const newAnimation = await library.createAnimation({
      name: 'Fade In',
      duration: 1000,
      easingFunction: 'ease-in',
    });
    console.log('Created Animation:', newAnimation);

    const updatedAnimation = await library.updateAnimation(newAnimation.id, {
      duration: 2000,
    });
    console.log('Updated Animation:', updatedAnimation);

    const deletedAnimation = await library.deleteAnimation(newAnimation.id);
    console.log('Deleted Animation:', deletedAnimation);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();