<template>
  <div class="new-post">
      <form action="">
      <div class="labels">
          
          <label>
			<input type="radio" name="radio" id="context" checked/>
			<span>#movie</span>
		</label>
          <label>
			<input type="radio" name="radio" id="context" checked/>
			<span>#books</span>
		</label>
          <label>
			<input type="radio" name="radio"  id="context" checked/>
			<span>#music</span>
		</label>
      </div>
      
      <h3 class="post-header">What do you want to talk about>></h3>
      <div class="input-area">
          <textarea class="post-context" type="" name="input"></textarea>
      </div>
       <button id="post">CENSURA!</button>
      </form>
  </div>
</template>

<script>
export default {
 name:'NewPost'
}
</script>

<style scoped lang="scss">
.input-area{
    display:block;
}
#post{
    max-width: 100px;
    height: 40px;
    align-self: flex-end;
    background: transparent;
    border: 0.1rem solid grey;
    margin-top: 0.4rem;
   border-radius: 99em;
}
.post-context{
    display: block;
    text-align: left;
    width: 650px;
    min-height: 100px;
    font-size: 15px;
    font-family: "Quicksand", sans-serif;
}
form {
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
}
$primary-color: rgb(68, 96, 255); 
$text-color: mix(#000, $primary-color, 64%);
label {
	display: inline-block;
	cursor: pointer;
	input {
		position: absolute;
		left: -9999px;
		&:checked + span {
			background-color: mix(#fff, $primary-color, 84%);
			&:before {
				box-shadow: inset 0 0 0 0.4375em $primary-color;
			}
		}
	}
	span {
		display: flex;
		align-items: center;
		padding: 0.3rem 0.5rem;
		border-radius: 99em; // or something higher...
		transition: 0.25s ease;
		&:hover {
			background-color: mix(#fff, $primary-color, 84%);
		}
		&:before {
			display: flex;
			flex-shrink: 0;
			content: "";
			background-color: #fff;
			width: 1em;
			height: 1em;
			border-radius: 50%;
			margin-right: 0.375em;
			transition: 0.25s ease;
			box-shadow: inset 0 0 0 0.125em $primary-color;
		}
	}
}
.new-post{
    display: flex;
    flex-direction: column;
    max-width: auto;
    height: auto;
    border: 0.5px solid grey;
    padding: 20px;
}

</style>