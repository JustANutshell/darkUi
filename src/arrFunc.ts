export function getRealFirstArrEntry(arr:any[]){
	for(let a=0;a<arr.length;a++){
		if(arr[a]!==undefined) return a;
	}
	return false;
}
export function getRealFirstArrMissEntry(arr:any[]){
	for(let a=0;a<arr.length;a++){
		if(arr[a]===undefined||arr[a]===null) return a;
	}
	return 0;
}