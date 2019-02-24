const array = (type, name, values) => {
  const arr = values.map(val => (type == 'String') ? `"${val}"` : val).join(', ')
  return `${name} = [${arr}]`
}

const type = type => {
  switch (type) {
      case 'String': return 'String'
      case 'Integer': return 'int'
      case 'Double': return 'double'
      case 'Boolean': return 'boolean'
      case 'Char': return 'char'
  }
}

const generateSubmission = (challenge, submission) => {
const { method_name, method_type } = challenge
const params = JSON.parse(challenge.parameters)
const tests = JSON.parse(challenge.tests)
return `# Reversea String.py


def ${method_name} (${params.map(param => param.name).join(', ')}):
${
  check(submission) ? submission.split('\n').map(s => s[0] == '\t' ? s : '\t' + s).join('\n') || ''
  : '\treturn None\nprint("{\\"error\\":\\"test\\",\\"payload\\":{\\"message\\":\\"You didn\'t write anything!\\"}}")'
}
#### please write above this line ####

${tests.inputs.map((values, n) => array(type(params[n].type), 'args' + n, values)).join('\n')}
${array(type(method_type), 'outputs', tests.outputs)}
results = []

for i in range(len(outputs)):
  res = ${method_name}(${params.map((_, i) => `args${i}[i]`).join(', ')})
  results.append(res == outputs[i])
  print("{\\"type\\":\\"test\\",\\"payload\\":{\\"test\\":"+str(i)+",\\"value\\":"+str(results[i]).lower()+"} }")
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