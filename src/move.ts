// Please update this type as same as with the data shape.

interface File {
  id: string;
  name: string;
}

interface Folder {
  id: string;
  name: string;
  files: File[];
}

type List = Folder[];

export default function move(list: List, source: string, destination: string): List {
  let destinationIndex: number | undefined;
  let sourceFile: File | undefined;

  list.forEach((folder: Folder, index) => {
    if (folder.id === source) {
      throw new Error('You cannot move a folder');
    }

    if (folder.id === destination) {
      destinationIndex = index;
    }

    folder.files.forEach((file: File, i) => {
      if (file.id === source) {
        sourceFile = file;
        folder.files.splice(i, 1);
      }
      if (file.id === destination) {
        throw new Error('You cannot specify a file as the destination');
      }
    });
  });

  if (!sourceFile) {
    throw new Error('Source file does not exists');
  }

  if (!destinationIndex) {
    throw new Error('Destination folder not exists');
  }

  const isSourceFileAlreadyExists = list[destinationIndex].files.some(
    (file) => file.name === sourceFile?.name,
  );

  if (isSourceFileAlreadyExists) {
    throw new Error('The given name of source element already exists on destination folder');
  }

  list[destinationIndex].files.push(sourceFile);

  return list;
  // throw new Error('Not implemented');
}
