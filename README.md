Disponibilização do Projeto
Para a disponibilização do projeto, utilizou-se a Vercel. Esta é uma plataforma de desenvolvimento de ponta a ponta que simplifica o processo de criação, implantação e gerenciamento de aplicativos web e estáticos. Com uma combinação poderosa de automação, escalabilidade e uma interface amigável, a Vercel permite que desenvolvedores se concentrem no código, enquanto a plataforma cuida dos detalhes técnicos da implantação. Além disso, sua integração perfeita com Git e sua capacidade de distribuir globalmente conteúdo estático tornam-na uma escolha popular para projetos de todos os tamanhos. Assim, o projeto está disponibilizado em: https://risc-v-monocycle-simulator.vercel.app/.

Instruções de Uso

Para utilizar o projeto, primeiro certifique-se de ter o Node.js e o Node Package Manager (npm) instalados em sua máquina. Comece clonando o repositório do GitHub usando o seguinte comando:

git clone https://github.com/DevMayTry/risc_v_monocycle_simulator.git

Em seguida, navegue até o diretório do repositório clonado e instale as dependências necessárias executando:

cd risc_v_monocycle_simulator && npm install

Para o desenvolvimento local, inicie o servidor de desenvolvimento executando:

npm run dev

Este comando iniciará a aplicação localmente, permitindo que você a visualize e a teste em seu navegador. Observe que ao utilizar o Windows, inclua a flag --no-optional ao instalar as dependências para pular a instalação do fsevents. Se você pretende implantar a aplicação em um ambiente de produção, primeiro será necessário construir o site usando:

npm run build

Após a conclusão do processo de construção com sucesso, inicie o servidor de produção com:

npm start

Lembre-se de que quaisquer alterações subsequentes no site requerem uma reconstrução usando npm run build antes de implantar, para garantir que as alterações mais recentes sejam refletidas.
