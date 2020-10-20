// 将数字装换成中文(只支持两位数)
const numberConversion = (number) => {
    let arr = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    let chinese = ''
    if (number < 10) {
        chinese = arr[number]
    } else {
        let str = number + ''
        let numberArray = str.split('')
        if (numberArray[0] === '1') {
            chinese = '十'
            chinese += arr[Number(numberArray[1])]
        } else {
            chinese = arr[Number(numberArray[0])]
            chinese += '十'
            chinese += arr[Number(numberArray[1])]
        }
    }
    return chinese
}
export {
    numberConversion
}