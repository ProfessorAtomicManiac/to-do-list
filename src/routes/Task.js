import { writable } from 'svelte/store';

function init() {
    const { subscribe, set, update } = writable([]);
    return {
        subscribe,
        add: (task) => {
            update(list => list = [...list, task]);
        },
        remove: (index) => {
            update((list) => list = list.filter((ele, ind) => index != ind))
        },
        reset: set([])
    }
}

export const taskList = init();

export function Task(title, desc, list) {
    let _title = title;
    let _desc = desc;
    let _list = list;

    this.getTitle = () => _title;
    this.getDesc = () => _desc;
    this.getList = () => _list;
}