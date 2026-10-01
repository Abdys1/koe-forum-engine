export interface PostCharacter {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Post {
  id: string;
  locationId: string;
  gameTitle: string;
  content: string;
  createdAt: string;
  character: PostCharacter;
}

export const dummyCharacter: PostCharacter = {
  id: "ryldan-dolzack",
  name: "Ryldan Dolzack",
  imageUrl: "/images/ryldan2.png",
};

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

const LONG_LOREM = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi.",
  "Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst.",
  "Fusce convallis, mauris imperdiet gravida bibendum, nisl turpis suscipit mauris, sed placerat ipsum urna sed risus. In convallis tellus a mauris. Curabitur non elit ut libero tristique sodales. Mauris a lacus. Donec mattis semper leo. In hac habitasse platea dictumst. Vivamus facilisis diam at odio. Mauris dictum, nisi eget consequat elementum, lacus ligula molestie metus, non feugiat orci magna ac sem. Donec turpis. Donec vitae metus. Morbi tristique neque eu mauris. Quisque gravida ipsum non sapien.",
  "Proin turpis lacus, laoreet sed, tempor eget, mollis in, nunc. Vivamus non elit. Suspendisse potenti. Sed semper, enim id dictum elementum, risus nulla rutrum metus, at ultrices purus dolor vel nibh. Phasellus viverra, nibh a interdum elementum, ante leo condimentum mauris, sit amet tincidunt justo tortor sit amet lacus. Praesent dictum lorem sed lorem. Mauris pretium. Nunc nec velit. Ut mollis, tortor id iaculis bibendum, magna dolor tempor justo, vel aliquam lectus est id purus.",
  "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam erat volutpat. Etiam sit amet ipsum ac nunc pellentesque molestie. Nam vitae dolor. Phasellus vel nisl. Integer quis lectus sit amet arcu dignissim dignissim. Cras rutrum magna sed lacus. Sed accumsan, nunc et ultrices facilisis, metus nisl placerat lectus, quis vestibulum nisi massa sit amet est. In ac felis. Nunc lacinia orci vitae ante. Morbi est neque, sodales at, varius sit amet, aliquet et, odio.",
  "Nam dapibus, urna in faucibus porttitor, libero lectus cursus est, eget consectetuer turpis neque vel diam. Sed vehicula ullamcorper nisi. Fusce aliquam, tellus vel vehicula faucibus, nibh lectus vehicula dolor, eu vestibulum tortor dui ut est. Quisque non arcu ut ipsum interdum accumsan. Nulla facilisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris vel enim non massa molestie vulputate.",
  "Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas faucibus mollis interdum. Donec ullamcorper nulla non metus auctor fringilla. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Aenean lacinia bibendum nulla sed consectetur. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo.",
  "Donec sed odio dui. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.",
].join("\n\n");

export const posts: Post[] = [
  {
    id: "1",
    locationId: "fogado-a-feher-siralyhoz",
    gameTitle: "Vihar a dokkok felett",
    content: LOREM,
    createdAt: "2026-09-26T19:12:00+02:00",
    character: dummyCharacter,
  },
  {
    id: "2",
    locationId: "fogado-a-feher-siralyhoz",
    gameTitle: "Vihar a dokkok felett",
    content: LOREM,
    createdAt: "2026-09-28T21:47:00+02:00",
    character: dummyCharacter,
  },
  {
    id: "3",
    locationId: "fogado-a-feher-siralyhoz",
    gameTitle: "Egy pohár rum",
    content: LOREM,
    createdAt: "2026-09-30T08:05:00+02:00",
    character: dummyCharacter,
  },
  {
    id: "4",
    locationId: "fogado-a-feher-siralyhoz",
    gameTitle: "Egy pohár rum",
    content: LONG_LOREM,
    createdAt: "2026-09-30T22:31:00+02:00",
    character: dummyCharacter,
  },
];
