<script>
    // All Event Listeners and "Viewing" code is put here
    // The storage is handled in Task.js
    import { Task } from './Task.js';
    import { afterUpdate } from 'svelte';
    import { flip } from 'svelte/animate';
    import { fade } from 'svelte/transition';

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
                <button on:click={() => del(task.index)} aria-label="Remove">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path>
                    </svg>
                    
                </button>
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
    button {
        --btn-border-width: 0;
        --btn-border-color: #dadcde;
        --btn-bg-color: #ffffff;
        --btn-hover-bg-color: #dadcde;
        --btn-trash-can-color: #6c757d;
        background-color: var(--btn-bg-color);
        color: var(--btn-trash-can-color);
        text-align: center;
        align-self: center;
        padding: 0;
        margin: 0;
        aspect-ratio: 1 / 1;
        /* would have liked to make height: 100% but it doesn't get the height of the flex parent, 
        so i did this instead. i really hate it*/
        height: calc(var(--task-height) - var(--task-padding));
        border: var(--btn-border-width) solid var(--btn-border-color);
        border-radius: var(--border-radius);
	}
    svg {
        background-color: transparent;
        vertical-align: middle;
        margin: 0;
    }
    button:hover {
        background-color: var(--btn-hover-bg-color);
    }
</style>