
import module from './page/module.vue'
import login from './page/login.vue'
import page404 from './page/404.vue'

import place_base from './page/place/base.vue'
import place_index from './page/place/index.vue'
import place_update from './page/place/update.vue'
import place_item from './page/place/item.vue'
import place_updateItem from './page/place/updateItem'
import place_itemList from './page/place/itemList'

import user_base from './page/user/base.vue'
import user_index from './page/user/index.vue'
import user_update from './page/user/update.vue'

import type_base from './page/type/base.vue'
import type_index from './page/type/index.vue'
import type_update from './page/type/update.vue'

import test_base from './page/test/base.vue'
import test_addTestName from './page/test/addTestName.vue'
import test_addQuestion from './page/test/addQuestion.vue'
import test_testList from './page/test/testList.vue'

import reg_base from './page/reg/base.vue'
import reg_add from './page/reg/add.vue'
import reg_list from './page/reg/list.vue'
import reg_look from './page/reg/look.vue'

import fault_base from './page/fault/base.vue'
import fault_index from './page/fault/index.vue'
import fault_check from './page/fault/check.vue'

export default [
    {
    	path: '/module', component: module,
        children: [
            {
                path: 'user', component: user_base,
                children: [
                    {path: '', component: user_update},
                    {path: 'index', component: user_index},
                    {path: 'update', component: user_update}
                ]
            },
            {
                path: 'place', component: place_base,
                children: [
                    {path: '', component: place_update},
                    {path: 'index', component: place_index},
                    {path: 'update', component: place_update},
                    {path: 'item', component: place_item},
                    {path: 'updateItem', component: place_updateItem},
                    {path: 'itemList', component: place_itemList}
                ]
            },
             {
                path: 'type', component: type_base,
                children: [
                    {path: '', component: type_update},
                    {path: 'index', component: type_index},
                    {path: 'update', component: type_update}
                ]
            },
             {
                path: 'test', component: test_base,
                children: [
                    {path: '', component: test_addTestName},
                    {path: 'addTestName', component: test_addTestName},
                    {path: 'addQuestion', component: test_addQuestion},
                ]
            },
            {
                path: 'reg', component: reg_base,
                children: [
                    {path: '', component: reg_add},
                    {path: 'list', component: reg_list},
                    {path: 'add', component: reg_add},
                    {path: 'look', component: reg_look},
                ]
            },
           {
                path: 'fault', component: fault_base,
                children: [
                    {path: '', component: fault_index},
                    {path: 'check', component: fault_check},
                ]
            },
        ]
    },
    {
        path: '/', component: login
    },
    {
        path: '/404', component: page404
    }
]
