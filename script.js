

  document.addEventListener('DOMContentLoaded', () => {
    // Adicionar vendedor
    document.getElementById('addVendedorBtn').addEventListener('click', () => {
      const vendedoresDiv = document.getElementById('vendedores');
      const modelo = vendedoresDiv.querySelector('.vendedor');
      const clone = modelo.cloneNode(true);
      clone.querySelectorAll('input').forEach(input => input.value = '');
      vendedoresDiv.appendChild(clone);
    });

    // Adicionar comprador
    document.getElementById('addCompradorBtn').addEventListener('click', () => {
      const compradoresDiv = document.getElementById('compradores');
      const modelo = compradoresDiv.querySelector('.comprador');
      const clone = modelo.cloneNode(true);
      clone.querySelectorAll('input').forEach(input => input.value = '');
      compradoresDiv.appendChild(clone);
    });

    // Limpar campos
    document.getElementById('btnLimpar').addEventListener('click', () => {
      document.querySelectorAll('.vendedor input').forEach(input => input.value = '');
      const vendedoresDiv = document.getElementById('vendedores');
      while (vendedoresDiv.children.length > 1) {
        vendedoresDiv.removeChild(vendedoresDiv.lastElementChild);
      }
      document.querySelectorAll('.comprador input').forEach(input => input.value = '');
      const compradoresDiv = document.getElementById('compradores');
      while (compradoresDiv.children.length > 1) {
        compradoresDiv.removeChild(compradoresDiv.lastElementChild);
      }
      ['nomeSitio','regSitio','tamSitio','norte','sul','leste','oeste','valor','valorReais','comarca','data'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
      document.getElementById('contrato').innerHTML = '';
    });

    // Atualizar contrato
    document.getElementById('btnAtualizar').addEventListener('click', () => {
      const vendedores = [...document.querySelectorAll('.vendedor')].map(div => ({
        nome: div.querySelector('.nomeVendedor').value.trim(),
        rg: div.querySelector('.rgVendedor').value.trim(),
        cpf: div.querySelector('.cpfVendedor').value.trim(),
        endereco: div.querySelector('.endVendedor').value.trim(),
        profissao: div.querySelector('.profVendedor').value.trim()
      })).filter(v => v.nome !== '');

      const compradores = [...document.querySelectorAll('.comprador')].map(div => ({
        nome: div.querySelector('.nomeComprador').value.trim(),
        rg: div.querySelector('.rgComprador').value.trim(),
        cpf: div.querySelector('.cpfComprador').value.trim(),
        endereco: div.querySelector('.endComprador').value.trim(),
        profissao: div.querySelector('.profComprador').value.trim()
      })).filter(c => c.nome !== '');

      if(vendedores.length === 0 || compradores.length === 0) {
        alert('Preencha pelo menos um vendedor e um comprador com nome.');
        return;
      }

      const textoVendedores = vendedores.map((v,i) => {
        const sep = (i === vendedores.length-1) ? '' : (vendedores.length>1 && i === vendedores.length-2 ? ' e ' : ', ');
        return `<span class="negrito">${v.nome}</span>, brasileiro(a), maior, <span class="negrito">${v.profissao}</span>, portador(a) do RG nº <span class="negrito">${v.rg}</span> e do CPF nº <span class="negrito">${v.cpf}</span>, domiciliado(a) no(a) <span class="negrito">${v.endereco}</span>${sep}`;
      }).join('');

      const textoCompradores = compradores.map((c,i) => {
        const sep = (i === compradores.length-1) ? '' : (compradores.length>1 && i === compradores.length-2 ? ' e ' : ', ');
        return `<span class="negrito">${c.nome}</span>, brasileiro(a), maior, <span class="negrito">${c.profissao}</span>, portador(a) do RG nº <span class="negrito">${c.rg}</span> e do CPF nº <span class="negrito">${c.cpf}</span>, domiciliado(a) no(a) <span class="negrito">${c.endereco}</span>${sep}`;
      }).join('');

      const nomeSitio = document.getElementById('nomeSitio').value.trim();
      const regSitio = document.getElementById('regSitio').value.trim();
      const tamSitio = document.getElementById('tamSitio').value.trim();
      const norte = document.getElementById('norte').value.trim();
      const sul = document.getElementById('sul').value.trim();
      const leste = document.getElementById('leste').value.trim();
      const oeste = document.getElementById('oeste').value.trim();
      const valor = document.getElementById('valor').value.trim();
      const valorReais = document.getElementById('valorReais').value.trim();
      const comarca = document.getElementById('comarca').value.trim();
      const data = document.getElementById('data').value.trim();

      const assinaturasVendedores = vendedores.map(v => `
        <div>
          ___________________________________________<br />
          <span class="negrito">${v.nome}</span> – Vendedor (a)
        </div>
      `).join('');

      const assinaturasCompradores = compradores.map(c => `
        <div>
          ___________________________________________<br />
          <span class="negrito">${c.nome}</span> – Comprador (a)
        </div>
      `).join('');

      const paragrafoInicial = `
      Pelo presente instrumento particular de contrato de promessa de compra e venda de imóvel, tem entre si, justo e contratado o(a) Senhor(a) ${textoVendedores}, neste ato denominado(a) de PROMITENTE VENDEDOR(A), e de outro lado o(a) Senhor(a) ${textoCompradores}, neste ato denominado(a) de COMPROMISSÁRIO(A) COMPRADOR(A) que mútua e reciprocamente aceita e outorga o que se segue.
      `;

      const contratoHTML = `
      <div class="page">
        <div class="conteudo">
          <div class="titulo-contrato">CONTRATO DE PROMESSA DE COMPRA E VENDA</div>
          <p class="paragrafo-inicial">${paragrafoInicial}</p>
          <p><strong>CLÁUSULA 1ª:</strong> Na qualidade de possuidor(a) a justo título de um terreno situado no(a) "<span class="negrito">${nomeSitio}</span>", pertencente à região <span class="negrito">${regSitio}</span>, com área de <span class="negrito">${tamSitio}</span> hectares, limitando-se da seguinte forma: ao norte com <span class="negrito">${norte}</span>, ao sul com <span class="negrito">${sul}</span>, ao nascente com <span class="negrito">${leste}</span> e ao poente com <span class="negrito">${oeste}</span>.</p>
          <p><strong>CLÁUSULA 2ª:</strong> O preço pela qual se compromete a vender é de R$ <span class="negrito">${valor}</span> (<span class="negrito">${valorReais}</span>), pagos à vista, neste ato em moeda corrente do país, pelo qual o Promitente Vendedor dá a mais plena e geral quitação.</p>
          <p><strong>CLÁUSULA 3ª:</strong> O imóvel cuja compra e venda é objeto deste contrato, fica desde já entregue ao (a) compromissário (a) comprador (a), que possuirá a título precário, até o momento que for outorgado à escritura pública, o que se fará oportunamente, sendo as despesas com escritura e registro por conta do (a) compromissário (a) comprador (a).</p>
        </div>
      </div>

      <div class="page">
        <div class="conteudo">
          <p><strong>CLÁUSULA 4ª:</strong> Com a assinatura deste contrato, a compra e venda fica caracterizada de caráter irrevogável e irretratável com plena quitação, podendo o compromissário (a) comprador (a) usar, gozar e dispor livremente o imóvel.</p>
          <p><strong>CLÁUSULA 5ª:</strong> Com a renúncia de qualquer outro, fica eleito o Fórum da Comarca de <span class="negrito">${comarca}</span>, para decidir e julgar todas e quaisquer ações, ou atos judicials oriundos deste contrato. Correrá por conta de parte perdedora, todas as despesas judiciais e extrajudiciais, bem como honorários advocatícios da parte vencedora.</p>
          <p><strong>CLÁUSULA 6ª:</strong> O presente contrato obriga em todos os seus termos, não só os contratantes, como seus herdeiros e sucessores.</p>
          <div class="data-direita"><span class="negrito">${comarca}</span>, <span class="negrito">${data}</span></div>
          <div class="assinaturas">
            ${assinaturasVendedores}
            ${assinaturasCompradores}
            <div>
              Testemunhas:<br />
              1 _________________________________________<br />
              2 _________________________________________
            </div>
          </div>
        </div>
      </div>`;

      document.getElementById('contrato').innerHTML = contratoHTML;
    });


    document.getElementById('btnGerarPDF').addEventListener('click', function() {
      const elemento = document.getElementById('contrato');

      if(!elemento.innerHTML.trim()) {
        alert('Por favor, atualize o contrato antes de gerar o PDF.');
        return;
      }

      const opt = {
        margin: [0, 0, 0, 0],
        filename: 'contrato.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'] }
      };

      html2pdf().set(opt).from(elemento).save()
        .catch(error => {
          console.error('Erro ao gerar PDF:', error);
          alert('Ocorreu um erro ao gerar o PDF. Verifique o console para mais detalhes.');
        });
    });
  });
