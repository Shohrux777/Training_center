import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'login',
        meta: { layout: 'empty' },
        component: () =>
            import ('../views/login/login.vue')
    },
    {
        path: '/company',
        name: 'company',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/company/company.vue')
    },
    {
        path: '/jadval',
        name: 'jadval',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/main/darsJadval.vue')
    },
    {
        path: '/mainPage',
        name: 'mainPage',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/main/mainPage.vue')
    },
  
    {
        path: '/view/:id',
        name: 'view',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/main/viewClient.vue')
    },
   
    {
        path: '/waiter',
        name: 'waiter',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/waiter/waiter.vue')  
    },
    {
        path: '/checkGroup/:id',
        name: 'checkGroup',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/check/checkGroup.vue')  
    },
    {
        path: '/testResultGroup/:id',
        name: 'testResultGroup',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/check/testResultGroup.vue')  
    },
    {
        path: '/payGroup/:id',
        name: 'payGroup',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/pay/payGroup.vue')  
    },
    {
        path: '/notPayed',
        name: 'notPayed',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/pay/notPayed.vue')  
    },
    {
        path: '/check_date',
        name: 'check_date',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/check_date.vue')  
    },
    {
        path: '/rasxod_report',
        name: 'rasxod_report',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/rasxod_report.vue')  
    },
    {
        path: '/delete_report',
        name: 'delete_report',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/delete_report.vue')
    },
    {
        path: '/kassa',
        name: 'kassa',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/pay/kassa.vue')  
    },
    {
        path: '/salaryPay',
        name: 'salaryPay',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/salery/salaryPay.vue')  
    },
    {
        path: '/salary_datail/:id',
        name: 'salary_datail',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/salery/salary_datail.vue')  
    },
    {
        path: '/debit_list',
        name: 'debit_list',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/debit/debit_list.vue')  
    },
    {
        path: '/payed_list',
        name: 'payed_list',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/debit/payed_list.vue')  
    },
    {
        path: '/salary',
        name: 'salary',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/salery/salary.vue')  
    },
    {
        path: '/groupList/:id',
        name: 'groupList',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/main/groupList.vue')
    },
    {
        path: '/company_add/:id',
        name: 'company_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/company/company_Add.vue')
    },
    {
        path: '/position',
        name: 'position',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/position/position.vue')
    },
    {
        path: '/position_add/:id',
        name: 'position_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/position/position_Add.vue')
    },
    {
        path: '/Book',
        name: 'Book',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/Book/Book.vue')
    },
    {
        path: '/BookAdd/:id',
        name: 'BookAdd',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/Book/BookAdd.vue')
    },
    {
        path: '/Book_Units',
        name: 'Book_Units',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/Book/Book_Units.vue')
    },
    {
        path: '/Book_UnitsAdd/:id',
        name: 'Book_UnitsAdd',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/Book/Book_UnitsAdd.vue')
    },
    {
        path: '/product',
        name: 'product',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/product/product.vue')
    },
    {
        path: '/product_add/:id',
        name: 'product_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/product/product_Add.vue')
    },
    {
        path: '/invoice',
        name: 'invoice',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/buy/buy.vue')
    },
    {
        path: '/invoice_add/:id',
        name: 'invoice_add',
        meta: { layout: 'empty' },
        component: () =>
            import ('../views/buy/buy_Add.vue')
    },
    {
        path: '/contragent',
        name: 'contragent',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/contragent/contragent.vue')
    },
    {
        path: '/contragent_add/:id',
        name: 'contragent_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/contragent/contragent_Add.vue')
    },
    {
        path: '/level',
        name: 'level',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/level/level.vue')
    },
    {
        path: '/level_add/:id',
        name: 'level_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/level/level_Add.vue')
    },
    {
        path: '/test',
        name: 'test',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/test/test.vue')
    },
    {
        path: '/test_add/:id',
        name: 'test_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/test/test_Add.vue')
    },
   
    
    {
        path: '/user',
        name: 'user',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/user/user.vue')
    },
    {
        path: '/user_add/:id',
        name: 'user_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/user/user_Add.vue')
    },
    {
        path: '/fans',
        name: 'fans',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/fans/fans.vue')
    },
    {
        path: '/fans_Add/:id',
        name: 'fans_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/fans/fans_Add.vue')
    },
    {
        path: '/groups',
        name: 'groups',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/groups/groups.vue')
    },
    {
        path: '/groups_Add/:id',
        name: 'groups_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/groups/groups_Add.vue')
    },
    {
        path: '/probniyFans',
        name: 'probniyFans',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/probniyFans/probniyFans.vue')
    },
    {
        path: '/probniyFans_Add/:id',
        name: 'probniyFans_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/probniyFans/probniyFans_Add.vue')
    },
    {
        path: '/department',
        name: 'department',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/department/department.vue')
    },
    {
        path: '/department_add/:id',
        name: 'department_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/department/department_Add.vue')
    },
    {
        path: '/client',
        name: 'client',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/client/client.vue')
    },
    {
        path: '/client_add/:id',
        name: 'client_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/client/client_Add.vue')
    },
    
    
    
       
    {
        path: '/authorization/:id',
        name: 'authorization',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/user/authorization.vue')
    },
    {
        path: '/mentor_page/:id',
        name: 'mentor_page',
        meta: { layout: 'empty'},
        component: () =>
            import ('../views/mentor/mentor_page.vue')
    },
    {
        path: '/groupPupils/:id',
        name: 'groupPupils',
        meta: { layout: 'empty'},
        component: () =>
            import ('../views/mentor/groupPupils.vue')
    },
    {
        path: '/mentor_check/:id',
        name: 'mentor_check',
        meta: { layout: 'empty'},
        component: () =>
            import ('../views/mentor/mentor_check.vue')
    },
    {
        path: '/mentor_pay/:id',
        name: 'mentor_pay',
        meta: { layout: 'empty'},
        component: () =>
            import ('../views/mentor/mentor_pay.vue')
    },
    {
        path: '/mentor_group',
        name: 'mentor_group',
        meta: { layout: 'empty'},
        component: () =>
            import ('../views/mentor/mentor_group.vue')
    },
    {
        path: '/book_mark/:id',
        name: 'book_mark',
        meta: { layout: 'empty'},
        component: () =>
            import ('../views/mentor/book_mark.vue')
    },
    


    // <----    Tegirmon  ---->

   

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


router.beforeEach((to, from, next) => {
    console.log(from)
    if (to.path != '/') {
        if (localStorage.Login != '') {
            if (localStorage.Type == 0) {
                next()
            } else if (localStorage.Type == 2) {
                if (to.path == '/doctor' ) {
                    next('/cashbox')
                }
            } 
             else {
                next()
            }
            next()

        } else {
            next('/')
        }
    } else {
        next()
    }
})

export default router