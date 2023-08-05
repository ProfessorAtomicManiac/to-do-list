<script>
    export let taskList;
    export let width;

    import { onDestroy } from 'svelte';

    let tasks;
    let unsubscribe = taskList.getTaskList().subscribe((list) => {
        tasks = list
    });

    onDestroy(unsubscribe);
</script>

<!-- I really don't like how I have to separate style:--width from the regular css
     reason I did this was cuz if style:width value changes, it doesn't update. so I
     had to make it an exported prop. but since that involves js it can't directly
     involve with the css -->
<div class="container" style:--width={width}>
    <h2>{taskList.getName()}</h2>
    <ul>
        {#each tasks as task}
            <li>
                <span>{task.getTitle()}</span>
                <button>delete</button>
            </li>
        {/each}
    </ul>
</div>

<style>
    * {
        --width: 0;
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