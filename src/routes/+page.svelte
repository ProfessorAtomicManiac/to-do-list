<script>
	import { TaskList, Task } from './Task.js';
	import TaskListEle from './TaskListEle.svelte';
	// testing purposes
	let todo = new TaskList("Todo");
	let done = new TaskList("Done");
	todo.add(new Task("skdljf", "sdlkjfsdkfs"));
	done.add(new Task("sjdsj", "kdsjf"));

	// Should move this logic elsewhere
	let screenWidth = 0;
	let width;
	$: {
		width = Math.max(0.2 * screenWidth, 200);
		console.log(screenWidth);
	}
	$: console.log(width);
	let num = 0;
	let bruh = () => {
		todo.add(new Task(num, "kdsjl"));
		console.log("bruh");
		num += 1;
	};
</script>

<svelte:window bind:innerWidth={screenWidth} />

<h1>Todo List</h1>

<div class="container">
	<TaskListEle taskList={todo} {width}/>
	<TaskListEle taskList={done} {width}/>
	<button on:click={bruh} style:width={width}>+ Add New List</button>
</div>

<style>
	.container {
		display: flex;
		width: 100%;
		background-color: yellow;
	}
	button {
		background-color: red;
	}
</style>