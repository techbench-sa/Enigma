const array = (type, name, values) => {
  const isString = type.indexOf('String') != -1
  const isChar = type.indexOf('char') != -1
  const arr = values.map(val => {
    val = val.trim()
    if (type.indexOf('[]') != -1)
      return `[${val.slice(1,-1)}]`
    const hasQoutes = val.length >= 2 && (val[0] == '"' || val[0] == "'")
    if (isString && !hasQoutes)
      return `"${val}"`
    if (isChar && !hasQoutes)
      return `'${val}'`
    return val
  }).join(', ')
  return `${name} = [${arr}]`
}


const type = type => {
  switch (type) {
    case 'String': return 'String'
    case 'Integer': return 'int'
    case 'Double': return 'double'
    case 'Boolean': return 'boolean'
    case 'Char': return 'char'
    case 'String Array': return 'String[]'
    case 'Integer Array': return 'int[]'
    case 'Double Array': return 'double[]'
    case 'Boolean Array': return 'boolean[]'
    case 'Char Array': return 'char[]'
  }
}

const generateSubmission = (challenge, submission) => {
const { method_name, method_type } = challenge
let params, tests
try {
  params = JSON.parse(challenge.parameters)
  tests = JSON.parse(challenge.tests)
} catch (e) {
  throw "Invalid challenge syntax ID: " + challenge.id;
}

return `# Reversea String.py


def ${method_name} (${params.map(param => param.name).join(', ')}):
${
  check(submission) ? submission.split('\n').map(s => s[0] == '\t' ? s : '\t' + s).join('\n') || ''
  : '\treturn None\nprint("{\\"error\\":\\"test\\",\\"payload\\":{\\"message\\":\\"You didn\'t write anything!\\"}}")'
}
#### please write above this line ####

error = "Please return something before submitting your code."

${tests.inputs.map((values, n) => array(type(params[n].type), 'args' + n, values)).join('\n')}
${array(type(method_type), 'outputs', tests.outputs)}
results = []

for i in range(len(outputs)):
  res = ${method_name}(${params.map((_, i) => `args${i}[i]`).join(', ')})
  results.append(res == outputs[i])
  if (res == None):
    res = ${method_type == 'String' ? '""' : '0'}
  print("{\\"type\\":\\"test\\",\\"payload\\":{\\"test\\":"+str(i)+",\\"result\\":\\""+str(res)+"\\",\\"value\\":"+str(results[i]).lower()+"} }")
`

}

const getSignature = challenge => {
  const { method_name, method_type } = challenge
  const params = JSON.parse(challenge.parameters)
  return `def ${method_name} (${params.map(param => param.name).join(', ')})`
}

const check = submission => {
  if (submission.replace(/#.*\n/g, '').replace(/"""(.|\n)*?"""/g, '').trim() === '')
    return false
  return true
}

module.exports = { generateSubmission, getSignature }