const CalendarPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      {/* Título */}
      <h2>Calendário</h2>

      {/* Container do calendário */}
      <div>
        {/* Topo: Mês + navegação */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3>Novembro de 2025</h3>

          <div style={{ display: "flex", gap: "10px" }}>
            <button>{"<-"}</button>
            <button>{"->"}</button>
          </div>
        </div>

        {/* Grade do calendário */}
        <table border={1} cellPadding={20} cellSpacing={0}>
          <thead>
            <tr>
              <th>domingo</th>
              <th>segunda-feira</th>
              <th>terça-feira</th>
              <th>quarta-feira</th>
              <th>quinta-feira</th>
              <th>sexta-feira</th>
              <th>sábado</th>
            </tr>
          </thead>

          <tbody>
            {/* Linha 1 */}
            <tr>
              <td></td>
              <td>27</td>
              <td>28</td>
              <td>29</td>
              <td>30</td>
              <td>31</td>
              <td>1</td>
            </tr>

            {/* Linha 2 */}
            <tr>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
              <td>8</td>
            </tr>

            {/* Linha 3 */}
            <tr>
              <td>9</td>
              <td>10</td>
              <td>11</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
              <td>15</td>
            </tr>

            {/* Linha 4 */}
            <tr>
              <td>16</td>
              <td>17</td>
              <td>18</td>
              <td>19</td>
              <td>20</td>
              <td>21</td>
              <td>22</td>
            </tr>

            {/* Linha 5 */}
            <tr>
              <td>23</td>
              <td>24</td>
              <td>25</td>
              <td>26</td>
              <td>27</td>
              <td>28</td>
              <td>29</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalendarPage;
