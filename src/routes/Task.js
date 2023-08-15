import { writable } from 'svelte/store';

// TaskList class
// This is coming from a guy who primarily uses Java
export function TaskList(name) {
    let _name = name;

    const _taskList = writable([]);
    this.add = (task) => {
        _taskList.update(list => {
            console.log(list);
            // having the TaskList add properties to the array element
            // does not seem like a good implementation
            // the Task cannot have a "index" property or it will break
            // this was necessary for animate:flip to work since each
            // the animation needs to know where to drop
            task = { ...task, index: list.length };
            list = [...list, task];
            return list;
        });
    };

    this.remove = (index) => {
        let ret;
        _taskList.update((list) => {

            list = list.filter(
                (ele, ind) => {
                    if (index == ind) {
                        ret = ele;
                        return false;
                    }
                    return true;
                }
            )
            for (let i = 0; i < list.length; i++) {
                list[i].index = i;
            }
            return list;
        }
        );
        return ret;
    };
    this.insert = (ind, val) => {
        _taskList.update((list) => {
            let temp = [...list];
            temp.splice(ind, 0, { ...val, index: ind });
            list = temp;
            for (let i = 0; i < list.length; i++) {
                list[i].index = i;
            }
            return list;
        });
    };
    this.move = (from, to) => {
        
        console.log(from + "->" + to);
        _taskList.update((list) => {
            let temp = [...list];
            
            let debug = [];
            list.forEach((ele) => debug.push(ele.getTitle()));
            console.log("Before: " + debug);
            debug = [];
            list.forEach((ele) => debug.push(ele.index));
            console.log("Before Ind: " + debug);
            let ret;
            temp = temp.filter((ele, ind) => {
                if (from == ind) {
                    ret = ele;
                    return false;
                }
                return true;
            });
            if (to > from) {
                //to = to - 1;
            }
            debug = [];
            temp.forEach((ele) => debug.push(ele.getTitle()));
            console.log("After Removal: " + debug + "      ind: " + to);

            temp.splice(to, 0, ret);
            for (let i = 0; i < temp.length; i++) {
                temp[i].index = i;
            }
            list = temp;

            console.log("Moved Element: " + ret.getTitle());
            debug = [];
            list.forEach((ele) => debug.push(ele.getTitle()));
            console.log("After: " + debug);
            debug = [];
            list.forEach((ele) => debug.push(ele.index));
            console.log("After Ind: " + debug);
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