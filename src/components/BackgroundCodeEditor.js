function BackgroundCodeEditor() {
  return (
    <div className="code-editor-background visible">
      <div className="code-editor-window">
        <div className="code-editor-header">
          <span className="editor-dot red"></span>
          <span className="editor-dot yellow"></span>
          <span className="editor-dot green"></span>
          <span className="editor-title">about.js</span>
        </div>
        <div className="code-editor-body">
          <div className="code-line">
            <span className="code-keyword">const</span>{" "}
            <span className="code-variable">roger</span>{" "}
            <span className="code-operator">=</span>{" "}
            <span className="code-brace">{"{"}</span>
          </div>
          <div className="code-line">
            {"  "}
            <span className="code-property">name</span>
            <span className="code-operator">:</span>{" "}
            <span className="code-string">'Roger Torres'</span>,
          </div>
          <div className="code-line">
            {"  "}
            <span className="code-property">role</span>
            <span className="code-operator">:</span>{" "}
            <span className="code-string">'Developer'</span>,
          </div>
          <div className="code-line">
            {"  "}
            <span className="code-property">age</span>
            <span className="code-operator">:</span>{" "}
            <span className="code-number">18</span>,
          </div>
          <div className="code-line">
            {"  "}
            <span className="code-property">school</span>
            <span className="code-operator">:</span>{" "}
            <span className="code-string">'University of Pittsburgh'</span>,
          </div>
          <div className="code-line">
            {"  "}
            <span className="code-property">major</span>
            <span className="code-operator">:</span>{" "}
            <span className="code-string">'Computer Science'</span>,
          </div>
          <div className="code-line"></div>
          <div className="code-line">
            {"  "}
            <span className="code-property">skills</span>
            <span className="code-operator">:</span>{" "}
            <span className="code-brace">[</span>
          </div>
          <div className="code-line">
            {"    "}
            <span className="code-string">'Python'</span>,
          </div>
          <div className="code-line">
            {"    "}
            <span className="code-string">'JavaScript'</span>,
          </div>
          <div className="code-line">
            {"    "}
            <span className="code-string">'React'</span>,
          </div>
          <div className="code-line">
            {"    "}
            <span className="code-string">'HTML/CSS'</span>
          </div>
          <div className="code-line">
            {"  "}
            <span className="code-brace">]</span>,
          </div>
          <div className="code-line"></div>
          <div className="code-line">
            {"  "}
            <span className="code-function">buildProjects</span>
            <span className="code-brace">()</span>{" "}
            <span className="code-brace">{"{"}</span>
          </div>
          <div className="code-line">
            {"    "}
            <span className="code-keyword">return</span>{" "}
            <span className="code-string">'Creating awesome things!'</span>;
          </div>
          <div className="code-line">
            {"  "}
            <span className="code-brace">{"}"}</span>
          </div>
          <div className="code-line">
            <span className="code-brace">{"}"}</span>;
          </div>
          <div className="code-line"></div>
          <div className="code-line">
            <span className="code-comment">
              Always learning, always building
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
