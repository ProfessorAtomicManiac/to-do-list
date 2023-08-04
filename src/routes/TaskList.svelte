<script>
    export let taskList;
    export let title;
    console.log(taskList);
</script>

<div class="container">
    <h2>{title}</h2>
    <ul>
        {#each taskList as task}
            <li>
                <span>{task.getTitle()}</span>
                <button>delete</button>
            </li>
        {/each}
    </ul>
</div>

<style>
    * {
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
        border: 2px solid black;
        width: 20%;
        margin: 5px;
        padding: 5px;
    }

</style>