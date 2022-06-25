import { useState } from 'react';
import { Drawer, Button, Group } from '@mantine/core';
import { DotsVertical } from 'tabler-icons-react';
import './drawer.css'
function Drawermodrole() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Actions"
        padding="xl"
        size="sm"
        // background="black"
      >
        {/* Drawer content */}
        <ul>
  <li><a class="active" href="#home">message   </a></li>
  <li><a href="#news">Delete Channel</a></li>
  <li><a href="#news">Edit Channel</a></li>
  <li><a href="#contact">Make moderator</a></li>
  <li><a href="#about">Remove user </a></li>
</ul>

      </Drawer>

      <Group position="center">
        <DotsVertical onClick={() => setOpened(true)}></DotsVertical>
      </Group>
    </>
  );
}


export default Drawermodrole;