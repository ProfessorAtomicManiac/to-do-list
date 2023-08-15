<script>
	import { TaskList, Task } from './Task.js';
	import TaskListEle from './TaskListEle.svelte';
	// testing purposes
	let todo = new TaskList("Todo");
	let done = new TaskList("Done");
	todo.add(new Task("0", "sdlkjfsdkfs"));
	todo.add(new Task("1", "kdsjf"));
	todo.add(new Task("2", "kdsjf"));
	todo.add(new Task("3", "kdsjf"));

</script>


<body>
	<TaskListEle taskList={todo} />

</body>

<style>
	body {
		display: flex;
		justify-content: center;
		width: 100%;
		background-color: yellow;
	}
</style>