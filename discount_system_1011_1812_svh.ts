// 代码生成时间: 2025-10-11 18:12:52
import { PrismaClient } from '@prisma/client';

// Initialize Prisma client
const prisma = new PrismaClient();

// Define Discount model interface
interface Discount {
  id: string;
  name: string;
  discountPercentage: number;  // Discount in percentage
  description?: string;
}

// Define DiscountService class to handle discount operations
class DiscountService {
  async createDiscount(discount: Discount): Promise<Discount> {
    try {
      // Create a new discount record in the database
      const createdDiscount = await prisma.discount.create({
        data: {
          name: discount.name,
          discountPercentage: discount.discountPercentage,
          description: discount.description
        }
      });
      return createdDiscount;
    } catch (error) {
      // Handle errors such as unique constraint violations
      console.error('Failed to create discount:', error);
      throw error;
    }
  }

  async getDiscounts(): Promise<Discount[]> {
    try {
      // Retrieve all discount records from the database
      return await prisma.discount.findMany();
    } catch (error) {
      console.error('Failed to fetch discounts:', error);
      throw error;
    }
  }

  async updateDiscount(discountId: string, updatedData: Partial<Discount>): Promise<Discount> {
    try {
      // Update an existing discount record
      const updatedDiscount = await prisma.discount.update({
        where: { id: discountId },
        data: {
          name: updatedData.name,
          discountPercentage: updatedData.discountPercentage,
          description: updatedData.description
        }
      });
      return updatedDiscount;
    } catch (error) {
      console.error('Failed to update discount:', error);
      throw error;
    }
  }

  async deleteDiscount(discountId: string): Promise<void> {
    try {
      // Delete a discount record from the database
      await prisma.discount.delete({
        where: { id: discountId }
      });
    } catch (error) {
      console.error('Failed to delete discount:', error);
      throw error;
    }
  }
}

// Example usage
(async () => {
  const discountService = new DiscountService();
  try {
    // Create a new discount
    const newDiscount = await discountService.createDiscount({
      id: '1',
      name: 'New Year Sale',
      discountPercentage: 20,
      description: '20% off for New Year Sale'
    });
    console.log('Created Discount:', newDiscount);

    // Get all discounts
    const discounts = await discountService.getDiscounts();
    console.log('All Discounts:', discounts);

    // Update a discount
    const updatedDiscount = await discountService.updateDiscount('1', {
      discountPercentage: 25,
      description: 'Updated 25% off'
    });
    console.log('Updated Discount:', updatedDiscount);

    // Delete a discount
    await discountService.deleteDiscount('1');
    console.log('Discount deleted successfully');
  } catch (error) {
    console.error('Error:', error);
  }
})();