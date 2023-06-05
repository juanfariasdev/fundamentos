import { Readable, Writable } from 'node:stream';

class OneToHundredStream extends Readable{
    constructor(){
        super();
        this.index = 1;
    }
    _read(){
        const i = this.index++

        setTimeout(()=>{
            if(i > 100){
                this.push(null);
                return
            } else{
                const buf = Buffer.from(String(i))
                this.push(buf);
            }
        }, 1000)
    }
}

class MultiplyByTenStream extends Writable{
    _write(chunck, enconding, callback){
        console.log(Number(chunck.toString()) *10);
        callback()
    }
}

// Transform Streams are readable and writable
class InvertNumberStream extends Transform{
    _transform(chunk, enconding, callback){
        const transformed = Number(chunk.toString()) * -1;

        callback(null, Buffer.from(String(transformed)))
    }
}

new OneToHundredStream()
.pipe(new InvertNumberStream())
.pipe(new MultiplyByTenStream())