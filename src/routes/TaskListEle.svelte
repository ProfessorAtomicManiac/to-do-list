<script>
    // All Event Listeners and "Viewing" code is put here
    // The storage is handled in Task.js
    import { Task } from './Task.js';

    export let taskList; // TaskList instance in Task.js

    let tasks = taskList.getTaskList();

    function add() {
        taskList.add(new Task("kekw", "kekw"));
    }

    function del(ind) {
        taskList.remove(ind);
    }

</script>

<div class="container">
    <h2>{taskList.getName()}</h2>
    <ul>
        {#each $tasks as task, i}
            <li>
                <span>{task.getTitle()}</span>
                <button on:click={() => del(i)}>delete</button>
            </li>
        {/each}
        <li>
            <button on:click={add}>Add Item</button>
        </li>
    </ul>
</div>

<style>
    * {
        --width: 20%;
        font-family: Roboto, Montserrat;
        background-color: #ececec;
        box-sizing: border-box;
    }
    ul,li { 
        list-style-type: none;
        padding: 0;
    }
    li {
        display: flex;
        border: 1px solid black;
        margin: 5px, 5px;
    }
    span {
        flex: 1;
    }
    div {
        display: inline-block;
        border: 2px solid black;
        margin: 5px;
        padding: 5px;
        width: var(--width);
        background-color: red;
    }
</style>