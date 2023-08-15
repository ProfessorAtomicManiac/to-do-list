<script>
    // All Event Listeners and "Viewing" code is put here
    // The storage is handled in Task.js
    import { Task } from './Task.js';
    import { afterUpdate } from 'svelte';
    import { flip } from 'svelte/animate';
    import { fade } from 'svelte/transition';
    import Trash from './Trash.svelte'

    export let taskList; // TaskList instance in Task.js

    let tasks = taskList.getTaskList();

    // Logic for adding new tasks/removing tasks
    let text = "";
    let placeholderText = "Enter new task here"

    let div;
    let inputEle;
    let autoscroll = false;

    function add() {
        if (text !== "") {
            taskList.add(new Task(text, "kekw"));
            placeholderText = "Enter new task here";
            inputEle.focus();
            autoscroll = true;
        } else {
            placeholderText = "The task must have at least one character"
        }
        text = "";
    }

    function del(ind) {
        taskList.remove(ind);
    }

    afterUpdate(() => {
        if (autoscroll) {
            window.scrollTo(0, div.offsetTop + div.scrollHeight + 50);
            autoscroll = false;
        }
    })

    // Drag and drop

    function makeDraggable(node, task) {
        
        node.setAttribute("draggable", true);
        node.addEventListener("dragstart", (event) => {
            console.log("LSKJFJD: " + task.getTitle() + "     ,     " + task.index);
            event.dataTransfer.setData("text/plain", task.index);
        })

        node.addEventListener("dragover", (event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
        })

        node.addEventListener("drop", (event) => {
            event.preventDefault();
            const ind = event.dataTransfer.getData("text/plain");
            // console.log("Before: ");
            // $tasks.forEach((ele) => console.log(ele.getTitle()));
            taskList.move(ind, task.index);
            // console.log("After: ");
            // $tasks.forEach((ele) => console.log(ele.getTitle()));
        })
    }

</script>

<div class="container" bind:this={div}>
    <h2>{taskList.getName()}</h2>
    <ul>
        {#each $tasks as task (task)}
            <li 
                use:makeDraggable={task}
                transition:fade
                animate:flip={{ duration: 700 }}
            >
                <span class="task-name">{task.getTitle()}</span>
                <span class="hidden"></span>
                <Trash onclick={() => del(task.index)}></Trash>
            </li>
        {/each}
        <li>
            <form on:submit={(e) => {e.preventDefault(); add(); }}>
                <input bind:this={inputEle} bind:value={text} placeholder={placeholderText} maxlength=60/>
            </form>
        </li>
    </ul>
</div>

<style>
    * {
        --debug-background-color: #fff;
        background-color: var(--debug-background-color);
        box-sizing: border-box;
        --border-radius: 10px;
    }
    div {
        --task-list-width: 50%;
        --task-list-border-width: 2px;
        --task-list-border-color: black;
        --task-list-margin: 5px;
        --task-list-padding: 5px;
        --task-list-background-color: #fff;

        --font-heading: 'Montserrat';
        --font-regular-text: 'Roboto';

        display: inline-block;
        border: var(--task-list-border-width) solid var(--task-list-border-color);
        border-radius: var(--border-radius);
        margin: var(--task-list-margin);
        padding: var(--task-list-padding);
        width: var(--task-list-width);
        background-color: var(--task-list-background-color);
    }
    h2 {
        text-align: center;
        font-family: var(--font-heading);
    }
    ul,li { 
        list-style-type: none;
        padding: 0;
        font-family: var(--font-regular-text);
    }
    li {
        --task-border-width: 1px;
        --task-border-color: black;
        --task-margin: 5px;
        --task-padding: 3px;
        --task-name-margin: calc(5px - var(--task-padding));
        --task-background-color: #fff;
        --task-height: 2em;
        
        display: flex;
        border: var(--task-border-width) solid var(--task-border-color);
        border-radius: var(--border-radius);
        margin: var(--task-margin);
        padding: var(--task-padding);
        background-color: var(--task-background-color); 
        height: var(--task-height);   
    }
    .task-name {
        margin: var(--task-name-margin);
    }
    li:last-of-type {
        padding: 0;
        border: none;
    }
    form {
        width: 100%;
    }
    input {
        padding: calc(var(--task-padding) + var(--task-name-margin));
        flex: 1;
        width: 100%;
        height: 100%;
        border: var(--task-border-width) solid var(--task-border-color);
        background: none;
        border-radius: var(--border-radius);
    }
    .hidden {
        flex: 1;
    }
</style>