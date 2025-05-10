let counter = 0;

document.getElementById('clickButton').addEventListener('click', function() {
  counter++;
  document.getElementById('counter').textContent = counter;
});
