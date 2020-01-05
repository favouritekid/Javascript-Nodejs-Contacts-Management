var obj1 = {"name":"Mai Ái Xuân Hương","email":"aixuanhuong89@gmail.com","phones":[{"label":"Mobile","phoneNumber":"0986987189"}]};
var obj2= {"name":"Mai Ái Xuân Hương 2","email":"aixuanhuong899@gmail.com","phones":[{"label":"Mobile","phoneNumber":"0986997189"}]};
console.log(obj1);
console.log(typeof obj1);
console.log(obj2);
console.log(typeof obj2);
var obj = {...obj1,...obj2};
console.log(obj);
console.log(typeof obj);