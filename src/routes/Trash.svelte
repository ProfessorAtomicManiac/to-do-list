<script>
    export let onclick;
</script>

<button on:click={onclick} aria-label="Remove">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path>
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path>
    </svg>
    
</button>

<style>
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