const { promises: fs } = require('fs')

async function existsPath (directory) { 
 try {
  await fs.access(directory)
  return true
 } catch {
  return false
 }
}

async function listDirectoryFiles(directory, files) {
  if(!files){
    files = []
  }
    
  if(! await existsPath(directory)) {
    console.log("Directory does not exist.")
  } 
  else {
    console.log("Directory exists.")
    let filesList = await fs.readdir(directory)
    for(let k in filesList) {
      let stat = await fs.stat(directory + '/' + filesList[k])
      if(stat.isDirectory()) {
        await listDirectoryFiles(directory + '/' + filesList[k], files)
      } 
      else {
        files.push(directory + '/' + filesList[k])
      }
    }
  }

  return files
}

async function test() {
  let files = await listDirectoryFiles('./data')
  console.log(files)
}

test();
