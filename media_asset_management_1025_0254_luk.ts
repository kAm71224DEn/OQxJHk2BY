// 代码生成时间: 2025-10-25 02:54:25
import { PrismaClient } from '@prisma/client';

// 定义一个 MediaAsset 类型，用于表示媒体资产
interface MediaAsset {
  id: string;
  name: string;
  type: string;
  fileSize: number; // 文件大小
  uploadedAt: Date; // 上传时间
}

// 创建 PrismaClient 实例
const prisma = new PrismaClient();

// 媒体资产管理类
class MediaAssetManagement {
  // 添加媒体资产
  async addMediaAsset(asset: MediaAsset): Promise<MediaAsset | null> {
    try {
      const newAsset = await prisma.mediaAsset.create({
        data: asset,
      });
      return newAsset;
    } catch (error) {
      console.error('Failed to add media asset:', error);
      throw error;
    }
  }

  // 获取所有媒体资产
  async getMediaAssets(): Promise<MediaAsset[]> {
    try {
      const assets = await prisma.mediaAsset.findMany();
      return assets;
    } catch (error) {
      console.error('Failed to retrieve media assets:', error);
      throw error;
    }
  }

  // 根据ID获取媒体资产
  async getMediaAssetById(id: string): Promise<MediaAsset | null> {
    try {
      const asset = await prisma.mediaAsset.findUnique({
        where: { id },
      });
      return asset;
    } catch (error) {
      console.error('Failed to retrieve media asset by ID:', error);
      throw error;
    }
  }

  // 更新媒体资产
  async updateMediaAsset(id: string, data: Partial<MediaAsset>): Promise<MediaAsset | null> {
    try {
      const updatedAsset = await prisma.mediaAsset.update({
        where: { id },
        data,
      });
      return updatedAsset;
    } catch (error) {
      console.error('Failed to update media asset:', error);
      throw error;
    }
  }

  // 删除媒体资产
  async deleteMediaAsset(id: string): Promise<MediaAsset | null> {
    try {
      const deletedAsset = await prisma.mediaAsset.delete({
        where: { id },
      });
      return deletedAsset;
    } catch (error) {
      console.error('Failed to delete media asset:', error);
      throw error;
    }
  }
}

// 使用示例
(async () => {
  const management = new MediaAssetManagement();
  const newAsset = await management.addMediaAsset({
    id: '1',
    name: 'example.mp4',
    type: 'video',
    fileSize: 1024,
    uploadedAt: new Date(),
  });
  console.log('Created asset:', newAsset);

  const assets = await management.getMediaAssets();
  console.log('All assets:', assets);

  const asset = await management.getMediaAssetById('1');
  console.log('Asset by ID:', asset);

  const updatedAsset = await management.updateMediaAsset('1', {
    name: 'updated_example.mp4',
  });
  console.log('Updated asset:', updatedAsset);

  const deletedAsset = await management.deleteMediaAsset('1');
  console.log('Deleted asset:', deletedAsset);
})();