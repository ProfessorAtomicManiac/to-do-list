<script>
	import { TaskList, Task } from './Task.js';
	import TaskListEle from './TaskListEle.svelte';
	// testing purposes
	let todo = new TaskList("Todo");
	let done = new TaskList("Done");
	todo.add(new Task("skdljf", "sdlkjfsdkfs"));
	done.add(new Task("sjdsj", "kdsjf"));

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