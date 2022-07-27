export default {
    state: {
        Book: {
            rows: [],
            columns: ['name'],
            col: []
        },
        Book_Units: {
            rows: [],
            columns: ['name','oquvMarkazBookid'],
            col: []
        },

    },
    actions: {
        async fetchBook(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/OquvMarkazBooks');
            const res_data = await res.json();
            ctx.commit('updateBook', res_data);
        },
        async fetchBook_Units(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/OquvMarkazBookUnits');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateBook_Units', res_data);
        }
    },
    mutations: {
        updateBook(state, data) {
            console.log(data)
            state.Book.rows = data;
        },
        Book_delete_row(state, index) {
            state.Book.rows.splice(parseInt(index), 1);
        },
        updateBook_Units(state, data) {
            console.log(data)
            state.Book_Units.rows = data;
        },
        Book_Units_delete_row(state, index) {
            state.Book_Units.rows.splice(parseInt(index), 1);
        },

    },
    getters: {
        Book(state) {
            return state.Book;
        },
        Book_Units(state) {
            return state.Book_Units;
        }

    }
}