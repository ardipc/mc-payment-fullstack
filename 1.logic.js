let nums = [2,7,11,15];
let target = 13;

let result = [];

for(var i=0; i<nums.length; i++) {
  if(target > nums[i]) {
    let hasilDiKurangi = target - nums[i];
    let cariYangCocok = nums.filter(item => item === hasilDiKurangi);
    if(cariYangCocok.length) {
      result.push(i);
    }
  }
}

console.log(result);
