import { Readable, Writable } from 'node:stream';

class OneToHundredStream extends Readable{
    constructor(){
        super();
        this.index = 1;
    }
    _read(){
        const i = this.index++

        setTimeout(()=>{
            if(i > 3){
                this.push(null);
                return
            } else{
                const buf = Buffer.from(String(i))
                this.push(buf);
            }
        }, 1000)
    }
}

new OneToHundredStream()
.pipe(process.stdout)