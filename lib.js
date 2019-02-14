const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

module.exports = {
    createFolder: async dir => {
        try {
            await fs.statSync(dir)
        } catch {
            await fs.mkdirSync(dir)
        }
    },
    
    generateSubmission:  (lang, ...args) => {
        return require('./templates/' + lang).generateSubmission(...args)
    },

    getExtension: lang => {
        switch (lang) {
            case 'java': return 'java'
            case 'python': return 'py'
        }
    },

    getSignatures: challenge => {
        return {
            java: `${require('./templates/java').getSignature(challenge)}`,
            python: `${require('./templates/python').getSignature(challenge)}`
        }
    },

    compile: (lang, file) => {
        switch (lang) {
            case 'java':
                return process('javac', [file]).then(res => {
                    const dir = path.join(file.split('/').slice(0, -1).join('/'))
                    const fileName = file.split('/').pop().split('.')[0]
                    return process('java', ['-cp', dir, fileName])
                }).catch(err => err)
            case 'python':
                return process('python', [file]).catch(err => err)
        }
    }
}


const process = async (command, args)  => {
    const ls = spawn(command, args)

    return new Promise((resolve, reject) => {
        let response = []

        ls.stdout.on('data', d => response += d)
    
        ls.stderr.on('data', d => response += d)
    
        ls.on('close', (code) => {
            if (code == 0) resolve({result: response, code})
            else reject({error: response, code})
        })

    })
}

/*
    generateValidation: (lang, params, method) => {
        const declarations = params.map((param, n) => {
            const arrayBrackets = lang =='java' ? '{}' : '[]'
            const quotes = '""'
            const declaration = lang == 'java' ? `${param.type} []` : ''
            const endStatement = ';'

            const arr = param.data.map(p => {
                if (param.type == 'String')
                    return quotes[0] + p + quotes[1]
                return p
            }).join(', ')

            const name = n == params.length - 1 ? 'output' : `param${n}`
            return `${declaration} ${name} = ${arrayBrackets[0]}${arr}${arrayBrackets[1]}${endStatement}`
        }).join('\n')

        return `
            ${declarations}
            boolean [] results = new boolean[output.length];

            for (int i = 0; i < results.length; i++) {
                String res = ${method}(${params.slice(0, -1).map((_, i) => `param${i}[i]`).join(', ')});
                results[i] = (res.equals(output[i]));
                System.out.print("method(\\"" + ${params.slice(0, -1).map((_, i) => `param${i}[i]`).join(' + "\\"," + ')} + ")");
                System.out.print(" ==> \\"" + res +"\\"");
                System.out.print("  Correct Result: \\"" + output[i] + "\\"");
                System.out.print(" -" + results[i] + "\\n");
            }

            int correct = 0;
            for (int i = 0; i < results.length; i++)
                if (results[i])
                    correct++;
                
            System.out.println("Score is: " + correct);
        `
    },
*/

        /*
            a == 1 ? 'A' :
            a == 2 ? 'B' :
            a == 3 ? 'C' :
            a == 4 ? 'D' :
            a == 5 ? 'E' :
            a == 6 ? 'F' :
            a == 7 ? 'G' :
            a == 8 ? 'H' :
            a == 9 ? 'I' :
            'X'
        */