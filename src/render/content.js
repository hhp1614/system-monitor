import os from 'os';
import { formatTime, formatMem } from './utils/format';
import { forEach } from 'iterall';

/**
 * 获取 DOM
 */
// 开机时间
const uptimeBlock = document.querySelector('#root .uptime');
// 主机名
const hostnameBlock = document.querySelector('#root .hostname');
// 内存
const memBlock = document.querySelector('#root .mem');
const cpuBlock = document.querySelector('#root .cpu');

// 设置显示开机时间
const showUptime = () => {
  const uptime = os.uptime();
  uptimeBlock.innerHTML = `开机时间：${formatTime(uptime)}`;
};

// 设置显示主机名
const showHostname = () => {
  const hn = os.hostname();
  hostnameBlock.innerHTML = `主机名：${hn}`;
};

// 设置显示内存
const showMem = () => {
  const totalMem = os.totalmem();
  const freeMen = os.freemem();
  memBlock.innerHTML = `空闲内存：${formatMem(freeMen)} 全部内存：${formatMem(totalMem)}`;
};

const showCPU = () => {
  const cpus = os.cpus();
  const usedArr = [];
  cpus.forEach((cpu, idx) => {
    const times = cpu.times;
    const used = (1 - times.idle / (times.idle + times.user + times.nice + times.sys + times.irq)) * 100;
    usedArr.push(`<span>CPU-${idx}: ${used.toFixed(2)} %</span><br>`);
  });
  cpuBlock.innerHTML = `
    <span>【CPU 信息】</span><br>
    <span>型号：</span><br>
    <span>${cpus[0].model}</span><br>
    <span>频率：${cpus[0].speed} MHz</span><br>
    <span>使用率：</span><br>
    <span>${usedArr.join('')}</span><br>
  `;
};

// 循环执行
const runLoop = () => {
  showUptime(); // 设置显示开机时间
  showMem(); // 设置内存
  showCPU();
};

// 执行一次
const runOnce = () => {
  showHostname(); // 设置主机名
};

const main = () => {
  runOnce();
  runLoop();
  setInterval(() => {
    runLoop();
  }, 1000);
};
main();
