describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opended', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('Submit')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
    cy.get('input:first').type('test')
    cy.get('input:last').type('test')
    cy.get('#login_btn').click()
    cy.contains('logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('input:first').type('test')
      cy.get('input:last').type('test')
      cy.get('#login_btn').click()
    })

    it('a user can create, like, & delete a blog', function() {
      cy.contains('create new blog').click()
      cy.get('#title_input').type('test title')
      cy.get('#author_input').type('test author')
      cy.get('#url_input').type('test url')
      cy.get('#blog_submit_btn').click()
      cy.contains('a new blog test title by test author added') 

      cy.contains('view').click()

      cy.get('.likeBtn').click()
      cy.contains('likes: 1')

      cy.get('button:last').click()
      cy.contains('Deleted blog "test title"')
    })
  })
})

