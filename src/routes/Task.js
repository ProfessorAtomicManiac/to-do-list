import { writable } from 'svelte/store';

// TaskList class
// This is coming from a guy who primarily uses Java
export function TaskList(name) {
    let _name = name;

    const _taskList = writable([]);
    this.add = (task) => {
        _taskList.update(list => list = [...list, task]);
    };
    this.remove = (index) => {
        _taskList.update((list) => list = list.filter((ele, ind) => index != ind))
    };
    this.insert = (index, val) => {
        _taskList.update((list) => {
            let temp = [...list];
            temp.splice(index, 0, val); 
            list = temp;
            return list;
        });
    }
    this.reset = _taskList.set([]);
    this.subscribe = _taskList.subscribe;
    this.getName = () => _name,
    this.getTaskList = () => _taskList
}

// Task class
export function Task(title = "", desc = []) {
    let _title = title;
    let _desc = desc;

    this.getTitle = () => _title;
    this.getDesc = () => _desc;
}