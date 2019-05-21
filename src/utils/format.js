export const formatTime = (seconds = 0) => {
  let day = (seconds / (3600 * 24)) | 0;
  let hours = ((seconds - day * 3600) / 3600) | 0;
  let minutes = ((seconds - day * 3600 * 24 - hours * 3600) / 60) | 0;
  let second = seconds % 60;
  // day && (day < 10) && (day = '0' + day);
  // hours && (hours < 10) && (hours = '0' + hours);
  // minutes && (minutes < 10) && (minutes = '0' + minutes);
  // second && (second < 10) && (second = '0' + second);
  day && (day += ' 天 ');
  hours && (hours += ' 小时 ');
  minutes && (minutes += ' 分钟 ');
  second && (second += ' 秒 ');
  return [day, hours, minutes, second].filter(i => i).join('');
};

export const formatMem = (mem) => {
  let G = 0, M = 0, KB = 0;
  (mem > (1 << 30)) && (G = (mem / (1 << 30)).toFixed(2));
  (mem > (1 << 20)) && (mem < (1 << 30)) && (M = (mem / (1 << 20)).toFixed(2));
  (mem > (1 << 10)) && (mem > (1 << 20)) && (KB = (mem / (1 << 10)).toFixed(2));
  return G > 0 ? G + 'G' : M > 0 ? M + 'M' : KB > 0 ? KB + 'KB' : mem + 'B';
};
