import { createStore } from 'vuex'

export default createStore({
    state (){
        return {
            show: false,
            menu: [
                {icon: 'paid', title: 'Salary', value: 'salary', link: '/salary',src:'/src/images/money.jpg'},
                {icon: 'schedule', title: 'Times GAP',value:'timesGAP', link: '/Gap&Unloading',src:'/src/images/clock.jpg'},

            ],
            titleToolBar: 'Home',
        }
    },
    mutations: {

    }
})