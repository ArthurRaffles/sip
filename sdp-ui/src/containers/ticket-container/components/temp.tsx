 
 interface GreatThing {
    [key: string]: number;
 }
 class Thing { 
    constructor(public args: {[s: string]: number; }) {
    }
 }
 
 const thing = new Thing({a:1, b:2, c:3});

 console.log(thing)