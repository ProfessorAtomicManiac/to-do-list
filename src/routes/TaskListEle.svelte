<script>
    // All Event Listeners and "Viewing" code is put here
    // The storage is handled in Task.js
    import { Task } from './Task.js';
    import { afterUpdate } from 'svelte';

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

</script>

<div class="container" bind:this={div}>
    <h2>{taskList.getName()}</h2>
    <ul>
        {#each $tasks as task, i}
            <li>
                <span>{task.getTitle()}</span>
                <button on:click={() => del(i)} aria-label="Remove">delete</button>
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
        --debug-background-color: #ececec;
        background-color: var(--debug-background-color);
        box-sizing: border-box;
    }
    div {
        --task-list-width: 50%;
        --task-list-border-width: 2px;
        --task-list-border-color: black;
        --task-list-margin: 5px;
        --task-list-padding: 5px;
        --task-list-background-color: red;

        --font-heading: 'Montserrat';
        --font-regular-text: 'Roboto';

        display: inline-block;
        border: var(--task-list-border-width) solid var(--task-list-border-color);
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
        --task-padding: 5px;
        --task-background-color: blue;

        display: flex;
        border: var(--task-border-width) solid var(--task-background-color);
        margin: var(--task-margin);
        padding: var(--task-padding);
        background-color: var(--task-background-color);    
    }
    li:last-of-type {
        padding: 0;
    }
    form {
        width: 100%;
    }
    input {
        padding: var(--task-padding);
        flex: 1;
        width: 100%;
    }
    span {
        flex: 1;
    }
    button {
        background-color: white;
        aspect-ratio: 1 / 1;
        height: 20px;
	}   
</style>