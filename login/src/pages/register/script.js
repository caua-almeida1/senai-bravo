<table className="table bg-white rounded shadow-sm  table-hover">
                                    <thead className='thead-users'>
                                        <tr>
                                            <th>#ID</th>
                                            <th>Nome</th>
                                            <th>E-mail</th>
                                            <th>Telefone</th>
                                            <th>Cep</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody> 
                                    {users.map(user => (
                                    <tr key={user.id}>
                                      <th data-title="#ID" scope="row">{user.id}</th>
                                      <td data-title="Nome">{editingUser && editingUser.id === user.id ? <input type="text" value={editingUser.name} onChange={(e) => handleInputChange(e, "name")} /> : user.name}</td>
                                      <td data-title="E-mail">{editingUser && editingUser.id === user.id ? <input type="text" value={editingUser.email} onChange={(e) => handleInputChange(e, "email")} /> : user.email}</td>
                                      <td data-title="Telefone">{editingUser && editingUser.id === user.id ? <input type="text" value={editingUser.telefone} onChange={(e) => handleInputChange(e, "telefone")} /> : user.telefone}</td>
                                      <td data-title="Cep">{editingUser && editingUser.id === user.id ? <input type="text" value={editingUser.cep} onChange={(e) => handleInputChange(e, "cep")} /> : user.cep}</td>
                                      {editingUser && editingUser.id === user.id ? (
                                                <div className="btn-group" role="group" aria-label="Ações">
                                                    <button type="button" className="btn btn-success" onClick={handleSave}>Salvar</button>
                                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(user)}>Deletar</button>
                                                </div>
                                                
                                            ) : (
                                                <div aria-label="Ações">
                                                    <button type="button" className="btn btn-primary" onClick={() => handleEdit(user)}>Editar</button>
                                                </div>
                                      )}
                                    </tr>
                                    ))}
                                    </tbody>
                                </table>