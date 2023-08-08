<script>
    // All Event Listeners and "Viewing" code is put here
    // The storage is handled in Task.js
    import { Task } from './Task.js';
    import { beforeUpdate, afterUpdate, tick } from 'svelte';

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
            console.log("bruh");
            window.scrollTo(0, div.offsetTop + div.scrollHeight + 50);
            console.log(div.scrollHeight + " " + div.offsetTop + " " + div.offsetParent);
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
                <button on:click={() => del(i)}>delete</button>
            </li>
        {/each}
        <li>
            <!-- Everytime you submit, make it scroll down so that it doesn't go to the top of the page-->
            <form on:submit={(e) => {e.preventDefault(); add(); }}>
                <input bind:this={inputEle} bind:value={text} placeholder={placeholderText} maxlength=60/>
            </form>
        </li>
    </ul>
</div>

<style>
    * {
        --width: 50%;
        font-family: Roboto, Montserrat;
        background-color: #ececec;
        box-sizing: border-box;
    }
    div {
        display: inline-block;
        border: 2px solid black;
        margin: 5px;
        padding: 5px;
        width: var(--width);
        background-color: red;
    }
    h2 {
        text-align: center;
    }
    ul,li { 
        list-style-type: none;
        padding: 0;
    }
    li {
        display: flex;
        border: 1px solid black;
        margin: 5px;
        padding: 5px;
        background-color: blue;
    }
    li:last-of-type {
        padding: 0px;
    }
    form {
        width: 100%;
    }
    input {
        padding: 5px;
        flex: 1;
        width: 100%;
    }
    span {
        flex: 1;
    }
    
</style>