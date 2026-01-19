function CodeSnippets() {
  return (
    <div id="code-snippets">
      {CODE_SNIPPETS.map((snippet, index) => (
        <div className="code-snippet" key={`snippet-${index}`}>
          {snippet}
        </div>
      ))}
    </div>
  );
}
