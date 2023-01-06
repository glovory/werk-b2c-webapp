// https://github.com/primefaces/primereact/blob/master/src/components/utils/UniqueComponentId.js
let lastId = 0;

export default function incrementId(prefix: any = 'w_'){
  lastId++;
  return prefix + lastId;
}
