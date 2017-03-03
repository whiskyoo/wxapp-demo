function formatTime(date) {
  const list = [...[1, 2, 3]];
  const { name, age } = { name: 'tom', age: 18 };
  const obj1 = { name: 'tom', age: 17 };
  const obj2 = { sex: 'man' };
  const obj = { ...obj1, ...obj2 };
  // console.log(obj);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();


  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`;
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : `0${n}`;
}

module.exports = {
  formatTime,
};
