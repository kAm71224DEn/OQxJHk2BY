// 代码生成时间: 2025-10-22 01:01:33
// smartHomeController.ts
// 使用TypeScript和PRISMA框架创建智能家居控制程序

import { PrismaClient } from '@prisma/client';

// 定义智能家居设备状态类型
type DeviceStatus = 'ON' | 'OFF';

// 定义智能家居设备接口
interface SmartDevice {
  id: string;
  name: string;
  status: DeviceStatus;
}

// 定义智能家居控制器类
class SmartHomeController {
  private prisma: PrismaClient;
  private devices: SmartDevice[];

  constructor() {
    // 初始化PRISMA客户端
    this.prisma = new PrismaClient();
    // 初始化设备列表
    this.devices = [];
  }

  // 添加设备到智能家居控制器
  public async addDevice(device: SmartDevice): Promise<void> {
    try {
      // 使用PRISMA客户端添加设备
      await this.prisma.smartDevice.create({
        data: {
          name: device.name,
          status: device.status,
        },
      });
      // 将设备添加到内存中的设备列表
      this.devices.push(device);
    } catch (error) {
      // 错误处理
      console.error('Failed to add device:', error);
      throw new Error('Failed to add device');
    }
  }

  // 获取所有设备状态
  public getDevices(): SmartDevice[] {
    // 返回设备列表
    return this.devices;
  }

  // 控制单个设备状态
  public async controlDeviceStatus(id: string, status: DeviceStatus): Promise<void> {
    try {
      // 使用PRISMA客户端更新设备状态
      await this.prisma.smartDevice.update({
        where: { id: id },
        data: { status: status },
      });
      // 更新内存中的设备状态
      const device = this.devices.find(d => d.id === id);
      if (device) {
        device.status = status;
      }
    } catch (error) {
      // 错误处理
      console.error('Failed to control device status:', error);
      throw new Error('Failed to control device status');
    }
  }
}

// 使用示例
(async () => {
  const controller = new SmartHomeController();

  // 添加设备
  await controller.addDevice({ id: '1', name: 'Living Room Light', status: 'OFF' });
  await controller.addDevice({ id: '2', name: 'Bedroom Fan', status: 'OFF' });

  // 获取设备状态
  const devices = controller.getDevices();
  console.log('Current Devices Status:', devices);

  // 控制设备状态
  await controller.controlDeviceStatus('1', 'ON');
  console.log('Controlled Devices Status:', controller.getDevices());
})();
