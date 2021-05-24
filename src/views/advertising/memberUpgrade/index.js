// 会员升级
import './index.css'
import config from '../../../config/index'
import { memberUpGradeModal } from "../../modal/memberUpGrade"


const addMemberUpgradeBtnFn = () => {
    if (document.getElementsByClassName('jdb-memberUpgrade-btn-box')[0]) return
    let memberUpgrade = document.createElement('div')
    memberUpgrade.className = 'jdb-memberUpgrade-btn-box'
    memberUpgrade.innerHTML = `<button class="jdb-memberUpgrade-btn">会员升级</button>`
    let parentElement = document.getElementsByClassName('shop-pageframe-navigation__inner')[0]
    let targetElement = document.getElementsByClassName('shop-pageframe-navigation__user-info')[0]
    parentElement.style.position = 'relative'
    parentElement.insertBefore(memberUpgrade, targetElement)
    let memberUpgradeBtns = document.getElementsByClassName('jdb-memberUpgrade-btn')
    memberUpgradeBtns[0].addEventListener('click', () => {
        memberUpGradeModal({ path: 'memberUpGrade' })
    })
}

/**
 * 添加店铺诊断按钮
 */
const addStoreDiagnosisBtnFn = () => {
    const parent = document.getElementsByClassName('right-components')[0];
    const current = document.createElement('div');
    current.id = 'storeDiagnosisBtn';
    current.innerHTML = `
        <div class="add-store-diagnosis-btn">
            <div class="store-btn-content">
                <div class="store-btn-title">点击诊断店铺</div>
                <div class="store-btn-desc">1~3分钟出店铺问题报告</div> 
            </div>
            <img class="store-btn-arrow" src="https://yushukeji.oss-cn-shenzhen.aliyuncs.com/plugin/add_store_arrow.png" alt="" />
        </div> 
    `;
    current.addEventListener('click', (e) => {
        let url = config.dzgjUrl + 'storeDiagnosis'
        window.open(url, '_blank')
    });
    parent.insertBefore(current, parent.children[0])
}


export {
    addMemberUpgradeBtnFn,
    addStoreDiagnosisBtnFn,
}